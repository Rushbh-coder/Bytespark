import React, { useState } from "react";
import Papa from "papaparse";
import { X, UploadCloud, CheckCircle, AlertCircle } from "lucide-react";

const ImportCSVModal = ({ onClose, onImport }) => {
  const [previewData, setPreviewData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setErrors([]);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const requiredFields = ["title", "description", "category", "price"];
        const csvHeaders = results.meta.fields;

        const missingFields = requiredFields.filter(
          (field) => !csvHeaders.includes(field)
        );

        if (missingFields.length > 0) {
          setErrors([
            `Missing required columns: ${missingFields.join(", ")}`
          ]);
          return;
        }

        const validatedData = results.data.map((item, index) => {
          if (!item.title || !item.price) {
            return {
              ...item,
              _error: `Row ${index + 1} missing title or price`
            };
          }

          return {
            id: Date.now() + Math.random(),
            title: item.title,
            description: item.description || "",
            category: item.category || "General",
            price: parseFloat(item.price) || 0,
            rating: 5.0,
            image: item.image || "",
          };
        });

        const rowErrors = validatedData
          .filter((row) => row._error)
          .map((row) => row._error);

        if (rowErrors.length > 0) {
          setErrors(rowErrors);
          return;
        }

        setPreviewData(validatedData);
      },
    });
  };

  const handleImport = () => {
    if (previewData.length === 0) return;
    onImport(previewData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-3xl p-8 shadow-2xl relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-rose-500"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-black mb-6">Import Products via CSV</h2>

        {/* Upload Section */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-rose-200 rounded-2xl p-10 cursor-pointer hover:bg-rose-50 transition-all">
          <UploadCloud size={40} className="text-rose-400 mb-3" />
          <span className="font-bold text-slate-700">
            Click to Upload CSV File
          </span>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>

        {fileName && (
          <p className="text-sm text-slate-400 mt-3">
            Selected File: {fileName}
          </p>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mt-4 bg-rose-50 border border-rose-200 rounded-xl p-4 text-rose-600 text-sm">
            {errors.map((err, i) => (
              <p key={i} className="flex items-center gap-2">
                <AlertCircle size={14} /> {err}
              </p>
            ))}
          </div>
        )}

        {/* Preview Table */}
        {previewData.length > 0 && (
          <div className="mt-6 max-h-60 overflow-auto border rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">{p.title}</td>
                    <td className="p-2">{p.category}</td>
                    <td className="p-2">${p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Import Button */}
        {previewData.length > 0 && (
          <button
            onClick={handleImport}
            className="mt-6 w-full bg-slate-900 text-white py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            Import {previewData.length} Products
          </button>
        )}
      </div>
    </div>
  );
};

export default ImportCSVModal;
