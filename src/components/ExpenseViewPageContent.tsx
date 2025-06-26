"use client";

import { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { categories } from "@/app/constant/expense";
import { ExpenseForm } from "./ExpenseForm";
import { EditExpenses } from "./EditExpenses";
import { DeleteConformationDialog } from "./DeleteConformationDialog";

export const ExpenseViewPageContent: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [editingExpense, setEditingExpense] = useState<any | null>(null);
  const [filter, setFilter] = useState({ date: "", category: "" });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(
      (exp) =>
        (!filter.date || exp.date.startsWith(filter.date)) &&
        (!filter.category || exp.category === filter.category)
    );
  }, [expenses]);

  const fetchExpenses = async () => {
    const response = await axios.get("/api/expenses");
    return response.data;
  };

  useEffect(() => {
    const getExpenses = async () => {
      const expenseResponse = await fetchExpenses();
      setExpenses(expenseResponse);
    };
    getExpenses();
  }, []);

  const formik = useFormik({
    initialValues: {
      _id: "",
      date: "",
      category: "",
      description: "",
      amount: "",
      paymentMethod: "",
      receiptLink: "",
    },
    validationSchema: Yup.object({
      date: Yup.string().required("Date is Required"),
      category: Yup.string().required("Please select a category"),
      description: Yup.string().required("Description is Required"),
      amount: Yup.number()
        .required("Amount is Required")
        .positive("Must be positive"),
      paymentMethod: Yup.string().required("Please select a payment method"),
    }),
    onSubmit: async (values) => {
      if (editingExpense) {
        const res = await axios.put(`/api/expenses/${values._id}`, values);
        console.log(res);

        setExpenses((prev) =>
          prev.map((exp) =>
            exp._id === editingExpense._id ? { ...exp, ...values } : exp
          )
        );
        setEditingExpense(null);
        setEditOpen(false);
      } else {
        const res = await axios.post("/api/expenses", values);
        console.log(res);

        setExpenses((prev) => [...prev, res.data.data]);
      }
      formik.resetForm();
    },
  });

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    setEditOpen(true);
    formik.setValues(expense);
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      const res = await axios.delete(`/api/expenses/${deleteConfirmId}`);
      console.log(res);

      setExpenses((prev) => prev.filter((e) => e._id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="flex flex-col items-start p-4 ">
      <h3 className="text-lg font-semibold mt-3 mb-8">Expense Records</h3>
      <ExpenseForm formik={formik} />
      <div className="mt-6 ">
        <h2 className="text-xl font-bold mb-2">Filter</h2>
        <div className="flex gap-4">
          <input
            type="date"
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            className="input"
          />
          <select
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="input"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
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
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => handleEdit(e)}
                    className="text-blue-500 hover:underline hover:cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(e._id)}
                    className="text-red-500 hover:underline hover:cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConformationDialog
        deleteConfirmId={deleteConfirmId}
        handleDelete={handleDelete}
        setDeleteConfirmId={setDeleteConfirmId}
      />
      <EditExpenses
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        editingExpense={editingExpense}
        formik={formik}
      />
    </div>
  );
};
