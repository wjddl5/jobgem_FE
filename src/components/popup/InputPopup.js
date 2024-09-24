// components/PopupInput.js
import { useState } from 'react';

const InputPopup = ({ isOpen, onClose, title, inputs, onSubmit }) => {
    // 입력 필드를 객체로 관리
    const [formValues, setFormValues] = useState({});

    // 필드 값 업데이트 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await onSubmit(formValues); // formValues 객체로 제출
        } catch (error) {
            console.error("Error during submission:", error);
        }
        setFormValues({}); // 제출 후 입력 필드 초기화
        onClose(); // 팝업 닫기
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={onClose}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">{title}</h2>

                        {inputs.map((input) => (
                            <div key={input.name} className="mb-4">
                                <label className="block mb-1 text-gray-600">{input.label}</label>
                                {input.type === 'textarea' ? (
                                    <textarea
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        className="w-full px-3 py-2 border rounded-md"
                                        value={formValues[input.name] || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <input
                                        type={input.type || 'text'}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        className="w-full px-3 py-2 border rounded-md"
                                        value={formValues[input.name] || ''}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                        ))}

                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={handleSubmit}
                            >
                                확인
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={onClose}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InputPopup;
