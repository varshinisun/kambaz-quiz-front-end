import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariable";
import ClickEvent from "./ClickEvent"
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent"
import PassingFunctions from "./PassingFunctions"
import StringStateVariables from "./StringStateVariables";
import ReduxExamples from "./ReduxExamples";
import HelloRedux from "./ReduxExamples/HelloRedux";
import AddRedux from "./ReduxExamples/AddRedux";
import TodoList from "./ReduxExamples/todos/TodoList";
import CounterRedux from "./ReduxExamples/CounterRedux";

export default function Lab4() {
     function sayHello() { alert("Hello"); }
      
     return(
          <div id="wd-lab4">
          <h1>Lab 4</h1>
          <h2>CS 4550 Online Section Varshini Sundaresan</h2>
          <hr></hr>
          <ClickEvent />
          <PassingDataOnEvent />
          <PassingFunctions theFunction={sayHello}/>
          <EventObject />
          <Counter />
          <BooleanStateVariables />
          <StringStateVariables />
          <DateStateVariable />
          <ObjectStateVariable />
          <ArrayStateVariable />
          <ParentStateComponent />
          <ReduxExamples />
          <HelloRedux />
          <CounterRedux />
          <AddRedux />
          <TodoList />          

          

          </div>
     )
}