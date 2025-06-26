import { categories, paymentMethods } from "@/app/constant/expense";
import React, { Dispatch, SetStateAction } from "react";

export const ExpenseForm: React.FC<IProps> = ({
  formik,
  editingExpense,
  setEditOpen,
}) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full border border-gray-300 rounded p-4 bg-white"
    >
      <div className="mb-2 md:mb-0">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date
        </label>
        <input
          id="date"
          type="date"
          {...formik.getFieldProps("date")}
          className="input border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
        {formik.touched.date && formik.errors.date && (
          <div className="text-red-500 text-xs">{formik.errors.date}</div>
        )}
      </div>
      <div className="mb-2 md:mb-0">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          id="category"
          {...formik.getFieldProps("category")}
          className="input border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category && (
          <div className="text-red-500 text-xs">{formik.errors.category}</div>
        )}
      </div>
      <div className="mb-2 md:mb-0">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount
        </label>
        <input
          id="amount"
          type="number"
          placeholder="Amount"
          {...formik.getFieldProps("amount")}
          className="input border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
        {formik.touched.amount && formik.errors.amount && (
          <div className="text-red-500 text-xs">{formik.errors.amount}</div>
        )}
      </div>
      <div className="md:col-span-3 mb-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="Description"
          {...formik.getFieldProps("description")}
          className="input border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-500 text-xs">
            {formik.errors.description}
          </div>
        )}
      </div>
      <div className="mb-2 md:mb-0 col-span-2">
        <label
          htmlFor="paymentMethod"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Payment Method
        </label>
        <select
          id="paymentMethod"
          {...formik.getFieldProps("paymentMethod")}
          className="input border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        >
          <option value="">Select Payment Method</option>
          {paymentMethods.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        {formik.touched.paymentMethod && formik.errors.paymentMethod && (
          <div className="text-red-500 text-xs">
            {formik.errors.paymentMethod}
          </div>
        )}
      </div>
      <div></div>
      <div className="flex flex-col md:flex-row gap-2 md:col-span-2">
        <button
          type="submit"
          className="bg-black text-white p-2 rounded hover:bg-gray-700 transition w-full md:max-w-[50%] hover:cursor-pointer"
        >
          {editingExpense ? "Update" : "Add"} Expense
        </button>
        {editingExpense && setEditOpen && (
          <button
            type="button"
            onClick={() => {
              setEditOpen(false);
              formik.resetForm();
            }}
            className="p-2 rounded hover:bg-gray-300 transition w-full md:max-w-[50%] hover:cursor-pointer border border-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

interface IProps {
  formik: any;
  editingExpense?: any;
  setEditOpen?: Dispatch<SetStateAction<boolean>>;
}
