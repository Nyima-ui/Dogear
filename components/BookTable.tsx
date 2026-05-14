"use";
import { Square } from "lucide-react";
import Image from "next/image";

const BookTable = () => {
  return (
    <table className="border border-black/20 w-full mt-3 bg-background rounded-md border-separate border-spacing-0 text-sm">
      {/* TABLE HEADING ROW  */}
      <thead className="bg-primary-600">
        <tr>
          <th className="table-heading checkbox">
            <div className="flex justify-center">
              <Square strokeWidth={1} color="#2A2A2A" size={16} />
            </div>
          </th>
          <th className="table-heading w-[168px]">Title</th>
          <th className="table-heading w-[128px]">Author</th>
          <th className="table-heading w-[104px]">Status</th>
          <th className="table-heading w-[128px]">Start date</th>
          <th className="table-heading w-[128px]">Finish date</th>
          <th className="table-heading w-[120px]">Rating</th>
          <th className="table-heading w-[252px]">Review</th>
          <th className="table-heading">Cover</th>
        </tr>
      </thead>

      {/* TABLE BODY  */}
      <tbody>
        {/* FIRST ROW  */}
        <tr>
          <td className="py-4">
            <div className="flex justify-center">
              <Square strokeWidth={1} color="#2A2A2A" size={16} />
            </div>
          </td>
          <td className="font-medium">Clockwork so</td>
          <td>Eli Ward</td>
          <td>Finished</td>
          <td>Jan 03, 2026</td>
          <td>Dec 14, 2026</td>
          <td>3</td>
          <td>
            <p className="line-clamp-1">
              This book was amazing, it was Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Incidunt reprehenderit architecto
              illum a fuga dolor?
            </p>
          </td>
          <td>
            <Image
              width={16}
              height={25}
              src={"/images/book-thief.jpg"}
              alt={"Book cover of Book Thief"}
            />
          </td>
        </tr>
        {/* SECOND ROW  */}
        <tr>
          <td>
            <div className="flex justify-center">
              <Square strokeWidth={1} color="#2A2A2A" size={16} />
            </div>
          </td>
          <td>Clockwork so</td>
          <td>Eli Ward</td>
          <td>Finished</td>
          <td>Jan 03, 2026</td>
          <td>Dec 14, 2026</td>
          <td>3</td>
          <td>
            <p className="line-clamp-1">
              This book was amazing, it was Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Incidunt reprehenderit architecto
              illum a fuga dolor?
            </p>
          </td>
          <td>
            <Image
              width={16}
              height={25}
              src={"/images/book-thief.jpg"}
              alt={"Book cover of Book Thief"}
            />
          </td>
        </tr>
        {/* THIRD ROW  */}
        <tr>
          <td>
            <div className="flex justify-center">
              <Square strokeWidth={1} color="#2A2A2A" size={16} />
            </div>
          </td>
          <td>Clockwork so</td>
          <td>Eli Ward</td>
          <td>Finished</td>
          <td>Jan 03, 2026</td>
          <td>Dec 14, 2026</td>
          <td>3</td>
          <td>
            {" "}
            <p className="line-clamp-1">
              This book was amazing, it was Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Incidunt reprehenderit architecto
              illum a fuga dolor?
            </p>
          </td>
          <td>
            <Image
              width={16}
              height={25}
              src={"/images/book-thief.jpg"}
              alt={"Book cover of Book Thief"}
            />
          </td>
        </tr>
        {/* FOURTH ROW  */}
        <tr>
          <td>
            <div className="flex justify-center">
              <Square strokeWidth={1} color="#2A2A2A" size={16} />
            </div>
          </td>
          <td>Clockwork so</td>
          <td>Eli Ward</td>
          <td>Finished</td>
          <td>Jan 03, 2026</td>
          <td>Dec 14, 2026</td>
          <td>3</td>
          <td>
            {" "}
            <p className="line-clamp-1">
              This book was amazing, it was Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Incidunt reprehenderit architecto
              illum a fuga dolor?
            </p>
          </td>
          <td>
            <Image
              width={16}
              height={25}
              src={"/images/book-thief.jpg"}
              alt={"Book cover of Book Thief"}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BookTable;
