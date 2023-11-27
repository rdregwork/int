type Square = {
    size: number;
  }

type Circle = {
    radius: number;
}

type Shape = Square | Circle;

function area(shape: Shape) {
    // ...
}