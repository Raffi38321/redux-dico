import LoadingBar from '@dimasmds/react-redux-loading-bar';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-[9999]">
      <LoadingBar className="bg-red-500 h-1" />
    </div>
  );
};

export default Loading;
