import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { RootState } from "../../store";
import { useBus } from "../hooks/useBus";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Badge } from "../../components/ui/badge";
import { Estado } from "../domain/enums/estado.enum";

export const BusDetailView = () => {
  const { isLoading, busData, errors } = useSelector(
    (state: RootState) => state.bus
  );
  const location = useLocation();

  const { searchBus } = useBus();

  useEffect(() => {
    const busId = location.pathname.split("/").pop();
    searchBus(busId!);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Bus Civa</CardTitle>
        <CardDescription>Detalle de Bus Civa</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        {errors ? (
          <p>{errors[0].msg}</p>
        ) : isLoading || busData == null ? (
          <p>Cargando...</p>
        ) : (
          <>
            <img src={`/civa-bus${busData!.busMar.marId}.png`} alt="civa bus" />
            <div>
              <CardTitle className="text-base pt-2">
                BUS: {busData!.busNum}
              </CardTitle>
              <CardDescription>
                <p>Marca: {busData!.busMar.marNom}</p>
                <p>Placa: {busData!.busPla}</p>
                <p>Caracteristicas: {busData!.busCar}</p>
                <Badge
                  className="my-2"
                  variant={
                    busData!.busEst == Estado.ACTIVO ? "success" : "default"
                  }
                >
                  {busData!.busEst}
                </Badge>
                <p>Fecha de registro: {busData!.busFecCre.toString()}</p>
              </CardDescription>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
