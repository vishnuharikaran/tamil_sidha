import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Package, AlertTriangle, Plus, Minus, Search, Filter, RefreshCw, Trash2, Edit3, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { CLINIC } from '../constants/clinic';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formulationFilter, setFormulationFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    medicineName: '',
    formulation: 'CHOORNAM',
    quantity: '',
    unit: 'Grams',
    reorderLevel: '20',
  });

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/inventory${formulationFilter ? `?formulation=${formulationFilter}` : ''}`);
      setInventory(res.data.data || res.data);
    } catch (err) {
      toast.error('Failed to load inventory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [formulationFilter]);

  const handleAdjustStock = async (item, delta) => {
    const newQty = Math.max(0, parseFloat(item.quantity) + delta);
    try {
      await API.put(`/inventory/${item.id}`, {
        medicineName: item.medicineName,
        formulation: item.formulation,
        quantity: newQty,
        unit: item.unit,
        reorderLevel: item.reorderLevel,
      });
      toast.success(`Updated ${item.medicineName} quantity to ${newQty}`);
      fetchInventory();
    } catch (err) {
      toast.error('Failed to update stock quantity.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await API.put(`/inventory/${editingItem.id}`, formData);
        toast.success('Inventory item updated!');
      } else {
        await API.post('/inventory', formData);
        toast.success('Inventory item added!');
      }
      setShowModal(false);
      setEditingItem(null);
      setFormData({ medicineName: '', formulation: 'CHOORNAM', quantity: '', unit: 'Grams', reorderLevel: '20' });
      fetchInventory();
    } catch (err) {
      toast.error('Failed to save inventory item.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item from inventory?')) return;
    try {
      await API.delete(`/inventory/${id}`);
      toast.success('Item deleted.');
      fetchInventory();
    } catch (err) {
      toast.error('Failed to delete item.');
    }
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormData({
      medicineName: item.medicineName,
      formulation: item.formulation,
      quantity: item.quantity.toString(),
      unit: item.unit,
      reorderLevel: item.reorderLevel.toString(),
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4 font-sans text-xs">
        <div>
          <h1 className="text-2xl font-bold font-serif text-forest-900">Siddha Medicines Inventory</h1>
          <p className="text-slate-500">Track stock levels across Choornam, Kudineer, Thailam, and Lehyam formulations.</p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select
            value={formulationFilter}
            onChange={(e) => setFormulationFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600 bg-white"
          >
            <option value="">All Formulations</option>
            {CLINIC.siddhaFormulations.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          <button
            onClick={() => {
              setEditingItem(null);
              setFormData({ medicineName: '', formulation: 'CHOORNAM', quantity: '', unit: 'Grams', reorderLevel: '20' });
              setShowModal(true);
            }}
            className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow transition-colors shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-200" />
            <span>Add Medicine Item</span>
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      {loading ? (
        <div className="p-8 text-center text-slate-500 font-sans text-xs">Loading inventory items...</div>
      ) : inventory.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 font-sans text-xs">
          No inventory items found matching current formulation.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-4">Medicine Name</th>
                  <th className="p-4">Formulation</th>
                  <th className="p-4">Stock Level</th>
                  <th className="p-4">Quick Adjust</th>
                  <th className="p-4">Reorder Threshold</th>
                  <th className="p-4">Stock Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inventory.map((item) => {
                  const isLowStock = item.quantity <= item.reorderLevel;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-slate-900 text-sm">{item.medicineName}</td>
                      <td className="p-4">
                        <span className="bg-emerald-100 text-emerald-900 font-bold text-[10px] px-2.5 py-1 rounded-full">
                          {item.formulation}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-slate-900">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleAdjustStock(item, -5)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                            title="Decrease 5"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleAdjustStock(item, 10)}
                            className="p-1 rounded bg-forest-50 hover:bg-forest-100 text-forest-800 font-bold"
                            title="Restock +10"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-slate-500">
                        {item.reorderLevel} {item.unit}
                      </td>
                      <td className="p-4">
                        {isLowStock ? (
                          <span className="inline-flex items-center space-x-1 bg-rose-100 text-rose-800 px-2.5 py-1 rounded-full font-bold text-xs">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Low Stock</span>
                          </span>
                        ) : (
                          <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold text-xs">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="text-slate-600 hover:text-forest-900 p-1 rounded hover:bg-slate-100"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-sans text-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-saffron-600/30">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold font-serif text-forest-900">
                {editingItem ? 'Update Stock Details' : 'Add Siddha Inventory Item'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Medicine Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thiriphala Choornam"
                  value={formData.medicineName}
                  onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Formulation Category *</label>
                <select
                  value={formData.formulation}
                  onChange={(e) => setFormData({ ...formData, formulation: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-600"
                >
                  {CLINIC.siddhaFormulations.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Current Quantity *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="100"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Unit *</label>
                  <input
                    type="text"
                    required
                    placeholder="Grams / Packs / Bottles"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Reorder Level Threshold</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="20"
                  value={formData.reorderLevel}
                  onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-saffron-600 hover:bg-saffron-700 text-white font-bold uppercase tracking-wider py-2.5 rounded-lg shadow transition-colors"
              >
                {editingItem ? 'Save Stock Changes' : 'Add to Inventory'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Inventory;
