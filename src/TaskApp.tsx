import { useEffect, useReducer, useState } from "react";
//imports de shadcn
import { Plus, Trash2, Check } from "lucide-react";
//importamos los components que nos crea shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import taskReducer, { getInitialState } from "./taskReducer";
import { AlertDemo as Alert } from "./components/ui/Alerts";
import Time from "./components/ui/Time";

export const TasksAppWithReducer = () => {
  const [inputValue, setInputValue] = useState(""); //state para la caja de texto donde escribimos la tarea
  const [alert, setAlert] = useState<boolean>(false); //state para mostrar la alerta
  const [state, dispatch] = useReducer(taskReducer, getInitialState());
  const [variant, setVariant] = useState<"default" | "destructive">("default");
  //!EXTRAEMOS LOS DATOS DEL ESTADO QUE NOS DEVUELVE useReducer
  const { todos, completed: completedCount, pending: totalCount } = state;
  //guardamos en local storage cada vez que el estado de las tareas cambia
  useEffect(() => {
    localStorage.setItem("tasks_app", JSON.stringify(todos));
  }, [todos]);
  const addTodo = () => {
    if (inputValue.length === 0) return; //si el input no contiene texto noo hacemos nada
    //añadimos la tarea

    if (todos.find((todo) => todo.text === inputValue)) {
      //si la tarea ya existe no la añadimos
      //usamos la alerta de shadcn
      setAlert(true);
      setVariant("destructive");
      setTimeout(() => {
        setAlert(false);
      }, 2000); //la alerta desaparece despues de 2 segundos
      setInputValue("");
    } else {
      //mostramos la alerta
      setAlert(true);
      setVariant("default");
      setTimeout(() => {
        setAlert(false);
      }, 2000); //la alerta desaparece despues de 2 segundos
      //añadimos la tarea
      dispatch({ type: "ADD_TODO", payload: inputValue }); //le pasamos el texto de la tarea como payload
      //vaciamos la caja de texto
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    // le pasamos el id a dispatch para cambiar el estado completado de la tarea
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const deleteTodo = (id: number) => {
    //eliminamos la tarea
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    // layout principal
    <div className="min-h-screen  shadow-2xl bg-gradient-to-br from-[#00a6d3]/20 to-[#00a6d3] p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Lista de Tareas
          </h1>
          <p className="text-slate-600">
            Mantén tus tareas organizadas y consigue hacerlas
          </p>
        </div>
        <Card className="m-10 p-10 shadow-xl border-0 bg-white/80 backdrop-blur-sm ">
          {alert && (
            <Card className="p-4">
              <Alert variant={variant} />
            </Card>
          )}
          {/* Card para mostrar la hora y la fecha actual */}
          <Card className="mb-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm ">
            <Time />
          </Card>

          {/* Card para añadir nuevas tareas */}
          <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex gap-2">
                {/* Input para añadir nuevas tareas */}
                <Input
                  placeholder="Añade una nueva tarea..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                />
                {/* Button para añadir nuevas tareas */}
                <Button
                  onClick={addTodo}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-4"
                >
                  <span>Añadir</span>
                  {/* Plus icon + .... es el icono que se muestra en el botón de shadcn */}
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Mostramos el progreso de las tareas completadas */}
          {totalCount > 0 && (
            <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-slate-700">
                  Progreso
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                  <span>
                    {completedCount} de {todos.length} completadas
                  </span>
                  <span>
                    {Math.round((completedCount / todos.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${(completedCount / todos.length) * 100}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-700">
                Tareas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todos.length === 0 ? (
                // si no hay tareas
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                    {/* Icono de verificación */}
                    <Check className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 text-lg mb-2">No hay tareas</p>
                  <p className="text-slate-400 text-sm">
                    Añade una tarea arriba para empezar
                  </p>
                </div>
              ) : (
                // si hay tareas
                <div className="space-y-2">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                        //
                        todo.completed
                          ? "bg-slate-50 border-slate-200"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                      }`}
                    >
                      {/* // Checkbox para marcar la tarea como completada */}
                      <Checkbox
                        checked={todo.completed} //si la tarea esta completada o no la marcamos como completada o No
                        //onCheckedChange es un evento que se dispara cuando cambiamos el estado del checkbox es de shadcn
                        onCheckedChange={() => toggleTodo(todo.id)} //cambiamos el estado de la tarea
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                      />
                      <span
                        className={`flex-1 transition-all duration-200 ${
                          // Si la tarea está completada, aplicamos estilos diferentes
                          todo.completed
                            ? "text-slate-500 line-through"
                            : "text-slate-800"
                        }`}
                      >
                        {todo.text}
                      </span>
                      <Button
                        // Botón para eliminar la tarea
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        {/* Icono de papelera */}
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Card>
      </div>
      {/* layout principal */}
      <footer>
        <div className=" text-center py-4 mt-8 border-t border-slate-200 box-shadow-sm text-xl">
          <p>&copy; 2025 Gestor de Tareas. By Jose Sanchez.</p>
          <a
            className=" hover:text-blue-500"
            href="https://github.com/joseg789"
          >
            GitHub
          </a>
          <span className="mx-2">|</span>
          <a
            className=" hover:text-blue-500"
            href="https://www.linkedin.com/in/jose-sanchez-8a11b0314/"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};
