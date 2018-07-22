using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_BOL
{
    public class SearchRequestModel
    {
        public int SearchRequestId { get; set; }
        public string SearchString { get; set; }
        public string SearchRootDirectory { get; set; }
        public bool IsComplete { get; set; }

        public SearchRequestModel()
        {
            IsComplete = false;
        }
            
    }
}
