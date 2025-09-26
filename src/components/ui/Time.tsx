type Props = {};

//componente para mostrar la hora actual y la fecha actual
function Time({}: Props) {
  //obtenemos la hora actual y la fecha actual
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  // const seconds = now.getSeconds();
  const day = now.getDate();
  const month = now.getMonth() + 1; //los meses empiezan en 0
  const year = now.getFullYear();
  //formateamos la hora y la fecha para que se muestren con dos dígitos
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  // const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  // const formattedYear = year < 10 ? `0${year}` : year;

  return (
    <div className=" text-center text-xl font-bold text-slate-500">
      <h2 className="text-2xl">Hora y Fecha Actual</h2>
      <p className="mt-2">
        Hoy es{" "}
        {`${formattedDay}/${formattedMonth}/${year}  hora: ${formattedHours}:${formattedMinutes}`}
      </p>
    </div>
  );
}

export default Time;
