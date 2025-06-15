const Header = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
  const day = String(date.getDate()).padStart(2, '0');
  const viewerFormatted = `${year}년 ${month}월 ${day}일`;

  return (
    <div className="title">
      <h3>오늘은 📅</h3>
      <h1 className="date">{viewerFormatted}</h1>
    </div>
  );
};

export default Header;
