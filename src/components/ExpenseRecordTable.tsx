import React, { Dispatch, SetStateAction } from "react";

export const ExpenseRecordTable: React.FC<IProps> = ({
  filteredExpenses,
  handleEdit,
  setDeleteConfirmId,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max mt-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Payment</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((e) => (
            <tr key={e._id} className="border-t">
              <td className="p-2 border">{e.date}</td>
              <td className="p-2 border">{e.category}</td>
              <td className="p-2 border">{e.description}</td>
              <td className="p-2 border">{e.amount}</td>
              <td className="p-2 border">{e.paymentMethod}</td>
              <td className="p-2 border flex gap-6 items-center justify-center">
                <button
                  onClick={() => handleEdit(e)}
                  className="text-blue-500 hover:underline hover:cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(e._id)}
                  className="text-red-500 hover:underline hover:cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface IProps {
  filteredExpenses: any[];
  setDeleteConfirmId: Dispatch<SetStateAction<string | null>>;
  handleEdit: (expense: any) => void;
}
