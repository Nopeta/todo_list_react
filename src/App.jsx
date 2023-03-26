import TodoListLV1 from './TodoListLV1'
import TodoListLV3 from './TodoListLV3'


function App() {
  return <>
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1>
      </nav>
      <div className="todoLvFlex">

      <TodoListLV1 />
      <TodoListLV3 />
      </div>
    </div>
  </>
}

export default App
