import { useState, useRef } from 'react';
const TodoListLV1 = () => {
    //初始TODO內容
    const [ todo, setToDo ] = useState( [
        { needTodo: "把冰箱發霉的檸檬拿去丟", checked: false },
        { needTodo: "打電話叫媽媽匯款給我", checked: false },
        { needTodo: "把整理電腦資料夾", checked: false },
        { needTodo: "繳電費水費瓦斯費", checked: false },
        { needTodo: "約vicky禮拜三泡溫泉", checked: false }
    ] );
    const inputRef = useRef();
    const [ canSelectTodo, setCanSelectToDo ] = useState( todo );

    // 異動相關
    const handleChange = ( e ) => {
        const { name, value, id } = e.target;

        //頁籤代辦事項的更換
        if ( name === 'tab' ) {
            if ( id === "全部" ) {
                setTakeTab( "全部" );
                setToDo( todo );
            }
            if ( id === "待完成" ) {
                setTakeTab( "待完成" );
                const todo2 = todo.filter( item => !item.checked );
                setCanSelectToDo( state => [ ...todo2 ] );
                // console.log( canSelectTodo );
            }
            if ( id === "已完成" ) {
                setTakeTab( "已完成" );
                const todo2 = todo.filter( item => item.checked );
                setCanSelectToDo( state => [ ...todo2 ] );
                // console.log( canSelectTodo );
            }
            // console.log( name + ' S ' + id );
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
                <a name="tab" className={takeTab === tab ? "active" : ""}
                    id={tab} onClick={handleChange} >{tab}
                </a>
            </li>

        );
    } );

    //記Check數
    const [ count, setCount ] = useState( todo.length );
    const countTodo = ( c ) => {
        c.checked = !c.checked;
        setCount( todo.filter( item => !item.checked ).length )
    }

    // 新增代辦事項（useRef寫法）
    const onSubmit = ( e ) => {
        e.preventDefault();
        const value = inputRef.current.value
        if ( value === '' ) {
            alert( "代辦事項沒有新增內容喔！" );
        } else {
            setToDo( prv => {
                return [ ...prv, { needTodo: value, checked: false } ]
            } )

            setCount( count + 1 );
        }
    }

    const todoList = ( todo ) => todo.map( ( item, i ) => (
        <li key={i}>
            <label className="todoList_label">
                <input name="checkbox" className="todoList_input" type="checkbox" value={i}
                    checked={item.checked} onChange={handleChange} onClick={() => countTodo( item )} />
                <span>{item.needTodo}</span>
            </label>
            <a><i className="fa fa-times" onClick={() => {
                // console.log( ` ${i}  delete ${`"` + item.needTodo + `"`}` );
                const tempTodo = [ ...todo ];
                tempTodo.splice( i, 1 )
                setToDo( tempTodo );
                setCount( tempTodo.filter( todo => !todo.checked ).length );
            }}></i></a>
        </li>
    ) );

    return (
        <>
            <div className="container todoListPage vhContainer">
                <h1>LV1</h1>
                <div className="todoList_Content">
                    <form className="inputBox" onSubmit={onSubmit}>
                        <input type="text" name="needTodo" placeholder="新增代辦事項" ref={inputRef} required />
                        <button type="onSubmit" ><i className="fa fa-plus"></i></button>
                    </form>
                    <div className="todoList_list">
                        <ul className="todoList_tab">
                            {tabList}
                        </ul>
                        <div className="todoList_items">
                            <ul className="todoList_item" >
                                {todo.length > 0 ? ( takeTab === "全部" ? todoList( todo ) : ( canSelectTodo.length === 0 ? < TodoListEmpty tab={takeTab} /> : todoList( canSelectTodo ) ) ) :
                                    < TodoListEmpty tab={takeTab} />}
                            </ul >
                            <div className="todoList_statistics">
                                <p> {count} 個待完成項目</p>
                                <a onClick={() => setToDo( prv => { return prv.filter( item => !item.checked ) } )} >清除已完成項目</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

const TodoListEmpty = ( tab ) => {
    switch ( tab.tab ) {
        case '已完成':
            return (
                <div className="todoList_empty">
                    <p>目前尚無已完成的代辦事項</p>
                    <hr />
                </div>
            );
        default:
            return (
                <div className="todoList_empty">
                    <p>目前尚無代辦事項</p>
                    <hr />
                </div>
            );
    };
};

export default TodoListLV1;