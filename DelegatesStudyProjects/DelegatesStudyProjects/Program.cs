using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DelegatesStudyProjects
{
    // Create a delegate
    // Define an event
    // Raise event
    // Create an EventArgs class


    class Program
    {
        static void Main(string[] args)
        {
            Person[] peopleArray = new Person[7];
            Signature[] signatureArray = new Signature[7];


            peopleArray[0] = new Person("Bob Arnold", true);
            peopleArray[0].SignActions += (string s) => { return s.ToLower(); };

            peopleArray[1] = new Person("Alice Avery", true);
            peopleArray[1].SignActions += (string s) => { return s.Replace(" ", ""); };

            peopleArray[2] = new Person("Albert Bailey", true);
            peopleArray[2].SignActions += (string s) => { return $"{s[0]}{s[s.IndexOf(' ') + 1]}"; };
            
            peopleArray[3] = new Person("Matt Baker", false);
            peopleArray[3].SignActions += (string s) =>
                            { return $"{s[0]}{s.Substring(s.IndexOf(' ') + 1)}"; };

            peopleArray[4] = new Person("Carol Campbell", true);
            peopleArray[4].SignActions += (string s) => { return s.ToUpper(); };

            peopleArray[5] = new Person("Kevin Brown", false);
            peopleArray[5].SignActions += (string s) => { return s.Replace(" ", "."); };

            peopleArray[6] = new Person("Lisa Bower ", true);
            peopleArray[6].SignActions += (string s) => { return s.Remove(s.IndexOf(' ')).ToLower(); };

            for (int i = 0; i < peopleArray.Length; i++)
            {
                var signature = new Signature(peopleArray[i].FullName, peopleArray[i].SignAction());
                Console.WriteLine($"{signature}");
            }           

            Console.ReadKey();

        }
    }    
}
