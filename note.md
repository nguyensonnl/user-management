### Typing props

Use a type alias or interface

```typescript
import React, { useEffect, useState } from "react";

interface EmployeeProps {
  name?: string;
  age?: number;
  country: string;
  children?: React.ReactNode;
}

function Employee({ name = "Ngọc Huyền", age = 28, country }: EmployeeProps) {
  return (
    <div>
      <h2>{name}</h2>
      <h2>{age}</h2>
      <h2>{country}</h2>
    </div>
  );
}

function App() {
  return (
    <>
      <Employee country="Thủ Đức" />
    </>
  );
}
export default App;
```

### Typing state with useState hook

```typescript
import React, { useEffect, useState } from "react";

function App() {
  const [strArr, setStrArr] = useState<string[]>([]);

  const [objArr, setObjArr] = useState<{ name: string; age: number }[]>([]);

  useEffect(() => {
    setStrArr(["Ngọc Huyền", "Cute"]);
    setObjArr([{ name: "Ngọc Huyền", age: 10 }]);
  }, []);

  console.log(strArr);
  console.log(objArr);

  return (
    <>
      <div>Hello</div>
    </>
  );
}

export default App;
```

### Typing events

```typescript
import React, { useEffect, useState } from "react";
function App() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.target);
    console.log(e.currentTarget);
  };

  return (
    <>
      {/* <Employee country="Thủ Đưc" /> */}
      <div>Hello</div>
      <button onClick={(e) => handleClick(e)}>Click</button>
    </>
  );
}
export default App;
```

### Typing refs
