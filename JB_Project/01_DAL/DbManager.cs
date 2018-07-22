using _02_BOL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;


namespace _01_DAL
{
    public static class DbManager
    {
        private static string connectionString = ConfigurationManager.ConnectionStrings["SearchesDB"].ConnectionString;
       
        /// <summary>
        /// Runs the InsertSearch SP which records a search request data
        /// Root directory is optional
        /// </summary>
        /// <param name="searchRequest"></param>
        public static void RecordNewSearchRequest(SearchRequestModel searchRequest)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    // Add input parameters

                    conn.Open();
                    SqlCommand cmd = new SqlCommand("InsertNewSearch", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@searchString", searchRequest.SearchString));
                    cmd.Parameters.Add(new SqlParameter("@searchRootDirectory", searchRequest.SearchRootDirectory));
                    cmd.Parameters.Add(new SqlParameter("@isComplete", searchRequest.IsComplete));

                    // Add output parameter which is search request id.
                    // We need it to record search results later.

                    var outId = new SqlParameter("@identity", SqlDbType.Int);
                    outId.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(outId);

                    // Execute SP and get search request ID
                    cmd.ExecuteNonQuery();
                    searchRequest.SearchRequestId = (int)cmd.Parameters["@identity"].Value;
                }
            }
            catch (Exception ex)
            {
                searchRequest.SearchRequestId = -1;
                Console.WriteLine($"Failed to record the search request. {ex.Message}");
            }
        }



        /// <summary>
        /// Runs update for IsComplete flag after the search is done.
        /// </summary>
        /// <param name="searchRequest"></param>
        public static void SetSearchRequestStatus(SearchRequestModel searchRequest)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    // Add input parameters
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("UpdateSearchStatus", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@searchRequestId", searchRequest.SearchRequestId));
                    cmd.Parameters.Add(new SqlParameter("@isComplete", searchRequest.IsComplete? 1:0));
                    
                    // Execute SP 
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to update the search request data. {ex.Message}");
            }
        }


        /// <summary>
        /// Records search result to DB (one result - one row)
        /// Each search can have several search results
        /// </summary>
        /// <param name="searchResult"></param>
        /// <returns>boolean success/failure</returns>
        public static bool RecordSearchResult(int reqId, string result)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("InsertSearchResult", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@searchRequestId", reqId));
                    cmd.Parameters.Add(new SqlParameter("@searchResultText", result));
                    cmd.ExecuteNonQuery();
                    return true;
                    
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
