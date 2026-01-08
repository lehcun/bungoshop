import React, { useState } from 'react';
import Button from '../ui/Button';
import { useCreateAddress } from '@/hook/address/useCreateAddress';
import { Address } from '@/models/User';
import { useUpdateAddress } from '@/hook/address/useUpdateAddress';

const AddAddressForm = ({
  initData,
  onSuccess,
  onCancel,
}: {
  initData?: Address | null;
  onSuccess?: () => void;
  onCancel: () => void;
}) => {
  const isEditMode = !!initData;

  const [formData, setFormData] = useState({
    recipient: initData?.recipient || '',
    phone: initData?.phone || '',
    line1: initData?.line1 || '',
    city: initData?.city || '',
    label: initData?.label || '',
    isDefault: initData?.isDefault || false,
  });

  const { createAddress } = useCreateAddress();
  const { updateAddress } = useUpdateAddress();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isDefault: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // <-- Dừng việc trình duyệt tự ý reload trang

    if (isEditMode) {
      updateAddress({ id: initData.id, ...formData }, { onSuccess });
    } else {
      createAddress(formData, { onSuccess }); // Truyền thẳng hàm onSuccess vào có tác dụng đè lên hàm trong hook
    }
  };

  return (
    <>
      <section>
        {/* <h2 className="mb-4 text-xl font-semibold">Địa chỉ mới</h2> */}
        <form className="flex flex-col gap-y-4 py-4" onSubmit={handleSubmit}>
          <input
            name="recipient"
            placeholder="Họ tên"
            value={formData.recipient}
            onChange={handleChange}
            className="rounded-lg border-1 border-gray-200 p-2"
          />

          <input
            name="city"
            placeholder="Tỉnh/Thành phố"
            value={formData.city}
            onChange={handleChange}
            className="rounded-lg border-1 border-gray-200 p-2"
          />

          <input
            name="line1"
            placeholder="Địa chỉ cụ thể"
            value={formData.line1}
            onChange={handleChange}
            className="rounded-lg border-1 border-gray-200 p-2"
          />

          <input
            name="phone"
            placeholder="SĐT Người nhận"
            value={formData.phone}
            onChange={handleChange}
            className="rounded-lg border-1 border-gray-200 p-2"
          />

          <input
            name="label"
            placeholder="Loại địa chỉ, VD: Nhà riêng, Văn phòng"
            value={formData.label}
            onChange={handleChange}
            className="rounded-lg border-1 border-gray-200 p-2"
          />
          <div className="flex items-center">
            <input
              name="isDefault"
              type="checkbox"
              onChange={handleCheckbox}
              className="mr-2 h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="text-gray-600">Đặt làm địa chỉ mặc định</label>
          </div>
          <div className="flex gap-x-2">
            <Button
              className="w-full rounded-xl border-1 border-blue-500 text-blue-500 hover:bg-gray-100"
              variant="outline"
              onClick={onCancel}
            >
              Quay Lại
            </Button>
            <Button
              type="submit"
              className="w-full rounded-xl bg-blue-500 hover:bg-blue-600"
            >
              {isEditMode ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ'}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddAddressForm;
