using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DelegatesStudyProjects
{
    delegate string SignActionHandler(string subject);

    class Person
    {
        public event SignActionHandler SignActions;

        public string FullName { get; set; }
        public bool WantToSign { get; set; }

        public Person(string fullName, bool wantToSign)
        {
            FullName = fullName;
            WantToSign = wantToSign;
        }
        
        public string SignAction()
        {
            if (!WantToSign || SignActions == null)
                return null;
            return SignActions.Invoke(FullName);
        }
    }
}
