import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { RootState } from "../../store";
import { useBus } from "../hooks/useBus";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { paginationLinks } from "../../utils/pagination.util";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

export const BusesView = () => {
  const { data, pagination } = useSelector((state: RootState) => state.bus);
  const {
    totalDocs,
    totalPages,
    page,
    size,
    numberOfElements,
    prevPage,
    nextPage,
    hasPrevPage,
    hasNextPage,
  } = pagination;

  const { searchHandler } = useBus();
  const navigate = useNavigate();

  const pageHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const page = parseInt(e.currentTarget.dataset.page!);
    searchHandler({ page: page });
  };

  const sizeHandler = (value: string) => {
    searchHandler({ size: parseInt(value) });
  };

  const fastPageHandler = (direction: string) => {
    if (direction === "prev") {
      prevPage != null && searchHandler({ page: prevPage });
    } else {
      nextPage != null && searchHandler({ page: nextPage });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Buses</CardTitle>
        <CardDescription>Listado de Buses de Civa</CardDescription>
      </CardHeader>
      <CardContent className="flex-wrap grid grid-cols-5 gap-4">
        {data.map((bus) => (
          <Card className="p-3" key={bus.busId}>
            <img src={`/civa-bus${bus.busMar.marId}.png`} alt="civa bus" />
            <CardTitle className="text-base pt-2">BUS: {bus.busNum}</CardTitle>
            <CardDescription>
              <p>Marca: {bus.busMar.marNom}</p>
              <p>Placa: {bus.busPla}</p>
            </CardDescription>
            <CardFooter className="flex p-0 pt-2">
              <Button
                className="w-full"
                onClick={() => navigate(`/bus/${bus.busId}`)}
              >
                Ver Detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <Select
            onValueChange={(value) => {
              sizeHandler(value);
            }}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={size} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="25">25</SelectItem>
            </SelectContent>
          </Select>
          <Label>
            Mostrando {page * size + 1} a {page * size + numberOfElements}{" "}
            registros de {totalDocs}
          </Label>
        </div>

        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={cn("cursor-pointer", {
                  "bg-zinc-100 cursor-default": !hasPrevPage,
                })}
                onClick={() => fastPageHandler("prev")}
              />
            </PaginationItem>
            {paginationLinks(totalPages, page + 1).map((i, idx) => (
              <PaginationItem key={idx}>
                {i === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={i == (page + 1).toString()}
                    data-page={parseInt(i) - 1}
                    onClick={pageHandler}
                    className={cn("cursor-pointer", {
                      "cursor-default": i == (page + 1).toString(),
                    })}
                  >
                    {i}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className={cn("cursor-pointer", {
                  "bg-zinc-100 cursor-default": !hasNextPage,
                })}
                onClick={() => fastPageHandler("next")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
};
