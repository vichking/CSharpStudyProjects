using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DelegatesStudyProjects
{
    public class Signature
    {
          public string FullName { get; }
          public string FullSignature { get; }

        public Signature(string fullName, string fullSignature)
        {
            FullName = fullName;
            FullSignature = fullSignature;
        }

        public override string ToString()
        {
            string displaySignature = string.IsNullOrEmpty(FullSignature)? "Choose not to sign" : FullSignature;
            return $"Full name: {FullName}, Signature: {FullSignature}";
        }


    }
}
