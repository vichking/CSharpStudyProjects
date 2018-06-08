using System;

namespace Shapes0406
{
    class Program
    {
        static void Main(string[] args)
        {
            var sq = new Square(1, 2, ShapeColor.Black, 5);
            sq.Draw();
            sq.DisplayShapeInfo();
            Console.WriteLine($"Area of a square is: {sq.CalculateArea()}, Perimeter is: {sq.CalculatePerimeter()}\n");
            
            var rec = new Rectangle(3, 5, ShapeColor.Red, 9, 5);
            rec.Draw();
            rec.DisplayShapeInfo();
            Console.WriteLine($"Area of a rectangle is: {rec.CalculateArea()}, Perimeter is: {rec.CalculatePerimeter()}\n");

            Console.ReadKey();
        }
    }
}
