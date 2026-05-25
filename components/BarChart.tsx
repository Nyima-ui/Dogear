"use client";
import { IBookDocument } from "@/types";
import { MONTHS } from "@/lib/constants";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const ChartConfig = {
  books: {
    label: "Books read:",
    color: "#FFE76E",
  },
};

const tickStyle = {
  fontSize: 14,
  fill: "#6a6a6a",
};

const BarChart = ({ books }: { books: IBookDocument[] }) => {
  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: MONTHS[i],
    books: 0,
  }));

  books.forEach((book) => {
    if (book.status === "Finished" && book.finishDate) {
      const monthIndex = new Date(book.finishDate).getMonth();
      chartData[monthIndex].books += 1;
    }
  });

  return (
    <div className="border border-primary/30 rounded-md py-6 pl-6 pr-20 max-md:pr-0 mt-5">
      <div className="max-sm:overflow-y-auto chart-scroll">
        <div className="max-sm:min-w-120">
          <ChartContainer config={ChartConfig} className="w-full h-67">
            <RechartsBarChart data={chartData} margin={{ left: -40 }}>
              <CartesianGrid vertical={false} stroke="#e6e5d8" />
              <XAxis
                dataKey={"month"}
                tick={tickStyle}
                axisLine={{ stroke: "#cccbc0" }}
                tickLine={{ stroke: "#fffef0" }}
              />
              <YAxis
                allowDecimals={false}
                tick={tickStyle}
                axisLine={{ stroke: "#fffef0" }}
                tickLine={{ stroke: "#fffef0" }}
              />
              <ChartTooltip
                content={<ChartTooltipContent className="border-gray-200" />}
                cursor={false}
                wrapperStyle={{ border: "none", outline: "none" }}
              />
              <Bar dataKey={"books"} fill="#ffe76e" radius={6} barSize={28} />
            </RechartsBarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
