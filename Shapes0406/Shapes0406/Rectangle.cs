using System;

namespace Shapes0406
{
    public class  Rectangle: Shape, IDrawable
    {
        public int Width { get; set; }
        public int Height { get; set; }
        public Rectangle(int xcoord, int ycoord, ShapeColor color, int width, int height) : base(xcoord, ycoord, color)
        {
            Width = width;
            Height = height;
        }


        public override int CalculateArea()
        {
            return Width * Height;
        }

        public override int CalculatePerimeter()
        {
            return (Width+Height) * 2;
        }


        public override void DisplayShapeInfo()
        {
            base.DisplayShapeInfo();
            Console.WriteLine($"The rectangle width is {Width}, height is {Height}\n");
        }

        public void Draw()
        {
            Console.WriteLine("\nDrawing a rectangle:\n");
            for (int i = 0; i < Height; i++)
            {
                string row = "";
                for (int j = 0; j < Width; j++)
                {
                    row += " * ";
                }
                Console.WriteLine($"{row}\n");
            }
        }

    }
}
