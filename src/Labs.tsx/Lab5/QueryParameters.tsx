import { useState } from "react";
import { FormControl } from "react-bootstrap"; 
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER; 

export default function QueryParameters() {
  const [a, setA] = useState<number>(0); 
  const [b, setB] = useState<number>(0);

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>
      
      <FormControl
        id="wd-query-parameter-a"
        className="mb-2"
        value={a}
        type="number"
        onChange={(e) => setA(parseFloat(e.target.value) || 0)} 
      />
      <FormControl
        id="wd-query-parameter-b"
        className="mb-2"
        value={b}
        type="number"
        onChange={(e) => setB(parseFloat(e.target.value) || 0)} 
      />

      <a
        id="wd-query-parameter-add"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
        target="_blank"
      >
        Add {a} + {b}
      </a>
      <br />

      <a
        id="wd-query-parameter-subtract"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
        target="_blank"
      >
        Subtract {a} - {b}
      </a>
      <br />

      <a
        id="wd-query-parameter-multiply"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
        target="_blank"
      >
        Multiply {a} * {b}
      </a>
      <br />

      <a
        id="wd-query-parameter-divide"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
        target="_blank"
      >
        Divide {a} ÷ {b}
      </a>

      <hr />
    </div>
  );
}
