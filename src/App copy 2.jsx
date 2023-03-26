import { useState } from "react";
import React from 'react'

function App() {
    //初始TODO內容
    const [ todo, setToDo ] = useState( [
        { needTodo: "把冰箱發霉的檸檬拿去丟", checked: false },
        { needTodo: "打電話叫媽媽匯款給我", checked: false },
        { needTodo: "把整理電腦資料夾", checked: false },
        { needTodo: "繳電費水費瓦斯費", checked: false },
        { needTodo: "約vicky禮拜三泡溫泉", checked: false }
    ] );
    const [ selectTodo, setSelectToDo ] = useState( todo );

    // 異動相關
    const handleChange = ( e ) => {
        const { name, value, id } = e.target;
        //新增代辦事項Input抓取
        if ( name === 'needTodo' ) {
            setNewToDo( ( X ) => ( { ...X, [ name ]: value } ) );
        }
        //頁籤代辦事項的更換
        if ( name === 'tab' ) {
            if ( id === "全部" ) {
                setTakeTab( "全部" );
                setToDo( todo );

            }
            if ( id === "待完成" ) {
                setTakeTab( "待完成" );
                const todo2 = todo.filter( item => !item.checked );
                setSelectToDo( ( state ) => [ ...todo2 ] );
                console.log( selectTodo );
                // todoList(selectTodo);
            }
            if ( id === "已完成" ) {
                setTakeTab( "已完成" );
                const todo2 = todo.filter( item => item.checked );
                setSelectToDo( ( state ) => [ ...todo2 ] );
                console.log( selectTodo );

            }
            console.log( name + ' S ' + id );
        }
        //代辦事項的checked的變動
        if ( name === "checkbox" ) {
            setToDo( ( states ) => {
                return states.map( ( state, i ) => {
                    if ( i === value ) {
                        state.checked = !checked;
                    }
                    return state;
                } )
            } )
        }
    };

    //分頁
    const allTab = [ "全部", "待完成", "已完成" ];
    const [ takeTab, setTakeTab ] = useState( "全部" );
    const tabList = allTab.map( ( tab, i ) => {
        return (

            <li key={i}>
                <a href="#" name="tab" className={takeTab === tab ? "active" : ""}
                    id={tab} onClick={handleChange} >{tab}
                </a>
            </li>

        );
    } );



    // 新增代辦事項
    const [ newTodo, setNewToDo ] = useState( { needTodo: "", checked: false } );
    //按下按鈕後增至明細
    const addToDoList = () => {
        if ( newTodo.needTodo != "" ) {
            setToDo( ( newList ) => [ ...newList, newTodo ] );
            setCount( count + 1 );
            setNewToDo( { needTodo: "", checked: false } );
        } else {
            alert( "代辦事項沒有新增內容喔！" );
        }
    };
    const todoList = ( changeTodo ) => changeTodo.map( ( item, i ) => (
        <li key={i}>
            <label className="todoList_label">
                <input name="checkbox" className="todoList_input" type="checkbox" value={i}
                    checked={item.checked} onChange={handleChange} onClick={() => countTodo( item )} />
                <span>{item.needTodo}</span>
            </label>
            <a href="#" ><i className="fa fa-times" onClick={() => {
                console.log( ` ${i}  delete ${`"` + item.needTodo + `"`}` );
                // setToDo(todo.filter(employee => employee.needTodo !== item.needTodo));
                const tempTodo = [ ...todo ];
                tempTodo.splice( i, 1 )
                setToDo( tempTodo );
                setCount( tempTodo.filter( todo => !todo.checked ).length );
            }}></i></a>
        </li>
    ) );

    //記Check數
    const [ count, setCount ] = React.useState( todo.length );
    const countTodo = ( c ) => {
        c.checked = !c.checked;
        setCount( todo.filter( item => !item.checked ).length )
    }

    return (
        <>
            <div id="todoListPage" className="bg-half">
                {console.log( '現在的selectTodo >>: ', selectTodo.length )}
                <nav>
                    <h1>
                        <a href="#">ONLINE TODO LIST</a>
                    </h1>
                </nav>
                <div className="container todoListPage vhContainer">
                    <div className="todoList_Content">
                        <div className="inputBox">
                            <input type="text" name="needTodo" placeholder="新增代辦事項"
                                value={newTodo.needTodo} onChange={handleChange} required />
                            <a href="#" onClick={addToDoList}>
                                <i className="fa fa-plus"></i>
                            </a>
                        </div>
                        <div className="todoList_list">
                            <ul className="todoList_tab">
                                {tabList}
                            </ul>
                            <div className="todoList_items">
                                <ul className="todoList_item" >
                                    {todo.length > 0 ? ( takeTab === "全部" ? todoList( todo ) : todoList( selectTodo ) ) : <TodoListEmpty />}
                                </ul >
                                <div className="todoList_statistics">
                                    <p> {count} 個待完成項目</p>
                                    <a href="#" onClick={() => {
                                        setToDo( todo.filter( item => !item.checked ) );
                                    }
                                    } >清除已完成項目</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
function TodoListEmpty() {
    return (
        <div className="todoList_empty">
            <p>目前尚無代辦事項</p>
            <hr />
        </div>
    );
}

export default App
