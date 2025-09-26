// reducer para manejar las tareas

import { useReducer } from "react";

//importamos zod  v4 para validar los datos de las tareas de local storage

import * as z from "zod/v4"; //usaremos z version 4

//creamos el schema para validar las tareas
const TodoSchema = z.object({
  id: z.number(), //el id es un numero
  text: z.string().min(1), //el texto es un string minimo 1 caracter
  completed: z.boolean(), //el completado es un booleano
});
//creamos el schema para validar el estado del reducer
const TasksStateSchema = z.object({
  todos: z.array(TodoSchema), //el estado es un array de tareas
  length: z.number(), // cantidad de tareas
  completed: z.number(), // tareas completadas
  pending: z.number(), // tareas pendientes
});

// interface para las tareas
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
//! un payload es un dato extra que puede llevar una accion
// interface para el estado del reducer
interface TaskState {
  todos: Todo[]; //el estado es un array de tareas
  length: number; // cantidad de tareas
  completed: number; // tareas completadas
  pending: number; // tareas pendientes
}

// acciones para el reducer
export type TaskAction =
  //!cada accion tiene un type y puede tener un payload
  //ADD_TODO (agregar tarea) | TOGGLE_TODO (cambiar estado completado) | DELETE_TODO (eliminar tarea)

  | { type: "ADD_TODO"; payload: string } //las acciones pueden tener un payload o no
  | { type: "TOGGLE_TODO"; payload: number } //!las acciones en MAYUSCULAS por convencion
  | { type: "DELETE_TODO"; payload: number };

// estado inicial
export const getInitialState = (): TaskState => {
  //funcion que retorna el estado inicial
  const storedTodos = localStorage.getItem("tasks_app");

  if (storedTodos) {
    //JSON.parse convierte un string a un objeto o array EN ESTE CASO UN ARRAY DE TAREAS
    //!DEBEMOS VALIDAR QUE NUESTROS DATOS EN LOCAL STORAGE SEAN VALIDOS ANTES DE PARSEARLOS
    const todos: Todo[] = JSON.parse(storedTodos); //convertimos el string a un array de tareas
    //validamos los datos con zod
    const parsed = TasksStateSchema.safeParse({
      todos, //array de tareas
      length: todos.length, //cantidad de tareas
      completed: todos.filter((todo) => todo.completed).length, //cantidad de tareas completadas
      pending: todos.filter((todo) => !todo.completed).length, //cantidad de tareas pendientes
    });
    if (parsed.error) {
      //si hay un error en la validacion mostramos un error en consola y retornamos un estado inicial vacio
      console.error("Error parsing tasks from localStorage:", parsed.error);
    } else {
      return parsed.data; //retornamos los datos validados
    }
  }
  //si no hay tareas en local storage retornamos un estado inicial vacio
  return {
    todos: [],
    length: 0,
    completed: 0,
    pending: 0, //inicialmente no hay tareas pendientes
  };
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case "ADD_TODO": //agregar tarea
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      return {
        ...state, //copiamos el estado actual
        length: state.length + 1, //incrementamos la cantidad de tareas
        pending: state.pending + 1, //incrementamos la cantidad de tareas pendientes
        todos: [...state.todos, newTodo], //agregamos la nueva tarea al array de tareas
      };

    case "TOGGLE_TODO": //cambiar estado completado de la tarea
      return {
        ...state, //copiamos el estado actual
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            if (todo.completed) {
              state.completed = state.completed - 1;
              state.pending = state.pending + 1;
            } else {
              state.completed = state.completed + 1;
              state.pending = state.pending - 1;
            }
            return { ...todo, completed: !todo.completed }; //cambiamos el estado de completado
          }
          return todo;
        }),
      };

    case "DELETE_TODO": //eliminar tarea
      //elimninamos el todo
      const currentTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      //actualizamos los contadores
      const completedTodos = currentTodos.filter(
        (todo) => todo.completed
      ).length;
      const pendingTodos = currentTodos.length - completedTodos; //actualizamos la cantidad de tareas pendientes
      return {
        ...state, //copiamos el estado actual
        todos: currentTodos, //creamos un nuevo array sin la tarea que queremos eliminar
        length: currentTodos.length, //decrementamos la cantidad de tareas
        completed: completedTodos, //actualizamos la cantidad de tareas completadas
        pending: pendingTodos, //actualizamos la cantidad de tareas pendientes
      };

    default:
      return state;
  }
};
export default taskReducer;

export const useTaskReducer = () => {
  // useReducer retorna el estado actual y la función dispatch para enviar acciones
  const [state, dispatch] = useReducer(taskReducer, {
    //pasamos un estado inicial con los contadores vacios
    todos: [],
    length: 0,
    completed: 0,
    pending: 0,
  });

  return { state, dispatch };
};
