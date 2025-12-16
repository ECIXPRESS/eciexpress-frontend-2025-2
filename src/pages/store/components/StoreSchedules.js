import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function StoreSchedules({ schedules }) {
    return (_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-base sm:text-lg font-semibold text-[#262626] mb-3", children: "Horarios:" }), _jsx("div", { className: "space-y-2", children: schedules.map((schedule, index) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600 text-sm sm:text-base", children: schedule.weekday }), _jsx("span", { className: "text-[#262626] font-semibold text-sm sm:text-base", children: schedule.hours })] }, index))) })] }));
}
