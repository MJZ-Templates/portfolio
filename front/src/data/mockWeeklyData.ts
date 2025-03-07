// data/mockWeeklyData.ts
export const generateWeeklyData = (weekOffset: number = 0) => {
    // 현재 날짜 기준으로 해당 주의 월요일을 찾습니다
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(monday.getDate() - monday.getDay() + 1 + (weekOffset * 7));
  
    const weekDays = ['월', '화', '수', '목', '금'];
    
    return weekDays.map((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      
      return {
        date: date.toISOString().split('T')[0], // YYYY-MM-DD 형식
        day,
        visitors: Math.floor(Math.random() * 50) + 10, // 10~60 사이의 랜덤값
      };
    });
  };