import { CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <div className="relative">
      <CircularProgress
        size={30}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px',
        }}
      />
    </div>
  );
};
