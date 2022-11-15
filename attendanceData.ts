// 상태 종류
const UserStatus = {
  ATTENDANCE: 'ATTENDANCE', // 출석
  ENTRANCE: 'ENTRANCE', // 입실
  EARLY_DEPARTURE: 'EARLY_DEPARTURE', // 조퇴
  ABSENT: 'ABSENT', // 결석
  BEFORE_ENTRANCE: 'BEFORE_ENTRANCE', // 입실 전
  OUTING: 'OUTING', // 외출
} as const;

type TUserStatus = typeof UserStatus[keyof typeof UserStatus];

// attendance_list: Array에 담기는 월별 출결 데이터
// 일별
type TDayData = {
  day: number;
  status: TUserStatus;
  status_time: number | null;
};
// 월별
type TMonthData = {
  month: number;
  day_list: TDayData[];
};

// results에 들어가는 데이터
type TUserAttendanceData = {
  row_number: number; // 순번 (정렬용인건지? @박선우)
  user_id: number; // user pk
  name: string;
  email: string;
  phone_number: string;
  timestamps: {
    entrance: number | null; // 입실
    outing: number | null; // 외출
    reentrance: number | null; // 재입실
    exit: number | null; // 퇴실
  };
  attendance_list: TMonthData[];
};

// response data
type ResponseAttendanceStatus = {
  count: number;
  next: string | null; //'다음 페이지 주소',
  previous: string | null; //'이전 페이지 주소',
  results: TUserAttendanceData[];
};

// time stamp에 null 값을 랜덤으로 주기 위한 함수
const randomTimeStamp = (max: number) => {
  const index = Math.floor(Math.random() * max);
  const arr = [Date.now(), null];
  return arr[index];
};

// 월별 데이터 생성
const userAttendanceList: TMonthData[] = Array.from(Array(3)).map(
  (_, index) => {
    return {
      month: index + 9,
      day_list: Array.from(Array(31)).map((_, index) => {
        const i = Object.keys(UserStatus) as TUserStatus[];
        return {
          day: index + 1,
          status: UserStatus[i[Math.floor(Math.random() * i.length)]],
          status_time: Date.now(),
        };
      }) as TDayData[],
    };
  }
) as TMonthData[];

// 유저별 데이터 생성
export const userAttendanceData: TUserAttendanceData[] = Array.from(
  Array(70)
).map((_, index) => {
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
export const attendanceData: ResponseAttendanceStatus = {
  count: 30,
  next: null,
  previous: null,
  results: userAttendanceData,
};