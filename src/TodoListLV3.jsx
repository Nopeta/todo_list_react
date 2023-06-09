import { useState, useRef } from 'react';
//輸入代辦事項
const InputTodo = ( { setTodo } ) => {
    const inputRef = useRef();
    const onSubmit = ( e ) => {
        e.preventDefault();
        const value = inputRef.current.value
        setTodo( prv => {
            return [ ...prv, { id: crypto.randomUUID(), needTodo: value, checked: false } ]
        } )
    }
    return (
        <>
            <form className="inputBox" onSubmit={onSubmit}>
                <input type="text" name="needTodo" placeholder="新增代辦事項" ref={inputRef} required />
                <button type="onSubmit" ><i className="fa fa-plus"></i></button>
            </form>
        </>
    )
};

//分頁頁籤
const ItemTab = ( { allTab, takeTab, setTakeTab } ) => {
    const handleTabChange = ( e ) => setTakeTab( e.target.id );
    return (
        <ul className="todoList_tab">
            {
                allTab.map( tab =>
                    <li key={tab}>
                        <a onClick={handleTabChange} id={tab} className={takeTab === tab ? "active" : ""}>
                            {tab}
                        </a>
                    </li> )
            }
        </ul>
    )
}

//清單
const ItemTabToggle = ( { todo, setTodo, tab } ) => {
    // console.log( tabTodo );
    let todo1 = []
    switch ( tab ) {
        case "已完成":
            todo1 = todo.filter( todo => todo.checked );
            if ( todo1.length == 0 ) {
                return ( <>
                    <TodoListEmpty context='目前無已完成待辦事項' />
                </> );
            }
            break;
        case "待完成":
            todo1 = todo.filter( todo => !todo.checked );
            break;
        case "全部":
            return ( <>
                {
                    <TodoList todo={todo} setTodo={setTodo} />
                }
            </> )
        default:
            break;
    }

    return (
        <>
            {
                <TodoList todo={todo1} setTodo={setTodo} />
            }
        </>
    );
}


const TodoList = ( { todo, setTodo } ) => {
    const handleChange = ( e ) => {
        const { value } = e.target;
        console.log( value );
        //代辦事項的checked的變動
        setTodo( states => states.map( ( state ) => {
            const x = state.id.toString();
            if ( x === value ) {
                return {
                    ...state,
                    checked: !state.checked,
                };
            }
            return state;
        } )
        );
    };
    return (
        <>
            {
                todo.map( ( item ) => (
                    <li key={item.id}>
                        <label className="todoList_label">
                            <input name="checkbox" className="todoList_input" type="checkbox" value={item.id}
                                checked={item.checked} onChange={handleChange} />
                            <span>{item.needTodo}</span>
                        </label>
                        <a ><i className="fa fa-times" onClick={() => {
                            console.log( ` ${item.id}  delete ${`"` + item.needTodo + `"`}` );
                            const tempTodo = [ ...todo ];
                            tempTodo.splice( item.id, 1 )
                            setTodo( prv => tempTodo );
                        }}></i></a>
                    </li> ) )}
        </>
    )
};

//清單無內容時
const TodoListEmpty = ( { context } ) => {
    return (
        <div className="todoList_empty">
            <p>{context}</p>
            <hr />
        </div>
    );
}

// 統計
const TodoCountClear = ( { todo, setTodo } ) => {
    return (
        <>
            <div className="todoList_statistics">
                <p> {todo.filter( item => !item.checked ).length} 個待完成項目</p>
                <a href="#" onClick={() => {
                    setTodo( todo.filter( item => !item.checked ) );
                }
                } >清除已完成項目</a>
            </div>
        </>
    )
}

const TodoListLV3 = () => {
    const [ todo, setTodo ] = useState( [] ); //TODO內容
    const allTab = [ "全部", "待完成", "已完成" ]; //分頁
    const [ takeTab, setTakeTab ] = useState( "全部" ); //分頁預設

    return (
        <>
            {console.log( todo )}

            <div className="container todoListPage vhContainer">
                <h1>LV3</h1>
                <div className="todoList_Content">
                    <InputTodo setTodo={setTodo} />
                    <div className="todoList_list">
                        <ItemTab allTab={allTab} takeTab={takeTab} setTakeTab={setTakeTab} />
                        <div className="todoList_items">
                            <ul className="todoList_item" >
                                {todo.length > 0 ? <ItemTabToggle todo={todo} setTodo={setTodo} tab={takeTab} /> : <TodoListEmpty context='目前無待辦事項' />}
                            </ul >
                            <TodoCountClear todo={todo} setTodo={setTodo} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default TodoListLV3;