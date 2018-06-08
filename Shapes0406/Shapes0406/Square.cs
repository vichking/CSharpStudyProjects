using System;

namespace Shapes0406
{
    public class Square : Shape, IDrawable
    {
        public int Length { get; set; }
        public Square(int xcoord, int ycoord, ShapeColor color, int length) : base(xcoord, ycoord, color)
        {
            Length = length;
        }

        public override int CalculateArea()
        {
            return Length*Length;
        }

        public override int CalculatePerimeter()
        {
            return Length * 4;
        }

        public override void DisplayShapeInfo()
        {
            base.DisplayShapeInfo();
            Console.WriteLine($"The square side length is {Length}\n");
        }

        public void Draw()
        {
            Console.WriteLine("\nDrawing a square:\n");
            for (int j = 0; j < Length; j++)
            {
                string row = "";
                for (int i = 0; i< Length; i++)
                {
                    row += " * ";
                }
                Console.WriteLine($"{row}\n");
            }           
        }
    }
}
