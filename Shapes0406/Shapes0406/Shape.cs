using System;

namespace Shapes0406
{
    public abstract class Shape
    {
        public int XCoord { get; set; }
        public int YCoord { get; set; }
        public ShapeColor Color { get; set; }

        public Shape(int xcoord, int ycoord, ShapeColor color) {
            XCoord = xcoord;
            YCoord = ycoord;
            Color = color;
        }

        public virtual void DisplayShapeInfo()
        {
            Console.WriteLine($"The shape coordinates are {XCoord}, {YCoord}. The shape color is {Color}. \n");
        }

        public abstract int CalculateArea();
        public abstract int CalculatePerimeter();
    }
}
