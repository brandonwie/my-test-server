"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceData = exports.userAttendanceData = void 0;
// 상태 종류
const UserStatus = {
    ATTENDANCE: 'ATTENDANCE',
    ENTRANCE: 'ENTRANCE',
    EARLY_DEPARTURE: 'EARLY_DEPARTURE',
    ABSENT: 'ABSENT',
    BEFORE_ENTRANCE: 'BEFORE_ENTRANCE',
    OUTING: 'OUTING', // 외출
};
// time stamp에 null 값을 랜덤으로 주기 위한 함수
const randomTimeStamp = (max) => {
    const index = Math.floor(Math.random() * max);
    const arr = [Date.now(), null];
    return arr[index];
};
// 월별 데이터 생성
const userAttendanceList = Array.from(Array(3)).map((_, index) => {
    return {
        month: index + 9,
        day_list: Array.from(Array(31)).map((_, index) => {
            const i = Object.keys(UserStatus);
            return {
                day: index + 1,
                status: UserStatus[i[Math.floor(Math.random() * i.length)]],
                status_time: Date.now(),
            };
        }),
    };
});
// 유저별 데이터 생성
exports.userAttendanceData = Array.from(Array(70)).map((_, index) => {
    const timestamp = randomTimeStamp(2);
    return {
        row_number: index + 1,
        user_id: index + 1,
        name: `${index + 1}석현`,
        email: `i-am-number-${index + 1}@email.com`,
        phone_number: `010-${Math.random().toFixed(4).slice(2)}-${Math.random()
            .toFixed(4)
            .slice(2)}`,
        // 오늘의 타임 스탬프
        timestamps: {
            entrance: timestamp,
            outing: timestamp,
            reentrance: timestamp,
            exit: timestamp,
        },
        attendance_list: userAttendanceList,
    };
});
// 최종 데이터 생성
exports.attendanceData = {
    count: 30,
    next: null,
    previous: null,
    results: exports.userAttendanceData,
};
