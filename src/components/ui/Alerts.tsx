import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type VariantProps = {
  variant?: "default" | "destructive";
};

export function AlertDemo({ variant = "default" }: VariantProps) {
  return (
    <>
      <div className="grid w-full max-w-xl items-center gap-4">
        {variant === "destructive" && (
          <Alert variant="destructive" className="border-none">
            <AlertCircleIcon />
            <AlertTitle>La Tarea no se pudo agregar.</AlertTitle>
            <AlertDescription>
              <p>Asegúrate de que la tarea no esté duplicada.</p>
              <ul className="list-inside list-disc text-sm">
                <li>Verifica los detalles de la tarea</li>
                <li>Intenta con un nombre de tarea diferente</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}
        {variant === "default" && (
          <Alert variant={variant}>
            <CheckCircle2Icon />
            <AlertTitle>Tarea Agregada Correctamente!</AlertTitle>
            <AlertDescription>
              <p>Tu tarea ha sido añadida a la lista.</p>
              <ul className="list-inside list-disc text-sm">
                <li>Revisa tu lista de tareas para ver la nueva entrada</li>
                <li>Marca la tarea como completada cuando termines</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
