using _02_BOL;
using _03_BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _04_UIL
{
    class Program
    {
        static void Main(string[] args)
        {
            bool doSearch = true;
            while (doSearch)
            {
                #region UserInput-------------------------------------------------------------------------

                Console.Clear();
                Console.WriteLine("\n\nFILE SEARCH: -----------------------------------------------\n");

                string inputStr = null;
                while (inputStr == null || inputStr.Length > 20 || inputStr.Length < 1)
                {
                    Console.WriteLine("Please enter full or partial file name (max. 20 characters): ");
                    inputStr = Console.ReadLine();
                }

                string inputDir = null;
                while (inputDir == null || inputDir.Length > 257)
                {
                    Console.WriteLine(@"Please enter search path (example: C:\MyFolder\AnotherFolder)\n
                    or click Enter to search the C drive: ");
                    inputDir = Console.ReadLine();
                }

                SearchRequestModel searchRequest = new SearchRequestModel
                {
                    SearchRootDirectory = inputDir.Length > 0 ? inputDir:  @"C:\",
                    SearchString = $"*{inputStr}*"
                };
                Console.WriteLine($"Searching the following file: {inputStr}...\n\n");

                #endregion


                #region Search-------------------------------------------------------------------------

                int resultsCntr = 0;
                Search search = new Search(searchRequest);
                search.OnFileFound += (request, result) => { Console.WriteLine($"{result}\n"); resultsCntr++; };
                search.RunSearch();

                #endregion


                #region Feedback -------------------------------------------------------------------------

                if (searchRequest.IsComplete && resultsCntr == 0)
                    Console.WriteLine("No files found.\n\n");
                if (!searchRequest.IsComplete)
                    Console.WriteLine($"Search is incomplete. Select another directory to narrow your search.\n\n");

                Console.WriteLine("Run another search? Y/N: ");
                var reply = Console.ReadLine();
                doSearch = reply.Equals("") || reply.ToLower().Equals("y");

                #endregion
            }
        }        
    }
}
