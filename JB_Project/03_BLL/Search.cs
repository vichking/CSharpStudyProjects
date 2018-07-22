using _01_DAL;
using _02_BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace _03_BLL
{
    public delegate void FileFoundHandler(SearchRequestModel req, string foundFileName);

    public class Search
    {
        public SearchRequestModel     SearchRequest { get; }
        public event FileFoundHandler OnFileFound;
        public int NumberOfResults { get; set; }

        public Search(SearchRequestModel searchRequest)
        {
            SearchRequest = searchRequest;
            DbManager.RecordNewSearchRequest(SearchRequest);
        }

        public void RunSearch()
        {
            try
            {
                foreach (var filename in Directory.EnumerateFiles
                    (SearchRequest.SearchRootDirectory, SearchRequest.SearchString, SearchOption.AllDirectories))
                {
                    DbManager.RecordSearchResult(SearchRequest.SearchRequestId, filename);
                    OnFileFound?.Invoke(SearchRequest, filename);
                    NumberOfResults++;
                }
                SearchRequest.IsComplete = true;
                DbManager.SetSearchRequestStatus(SearchRequest);
            }
            catch (DirectoryNotFoundException ex)
            {
                Console.WriteLine($"Directory not found: {ex.Message}.");
            }
            catch (UnauthorizedAccessException ex)
            {
                Console.WriteLine($"Exception running the search: {ex.Message}");
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Search failed with the following exception: {ex.Message}.");
            }
        }   

    }
}

