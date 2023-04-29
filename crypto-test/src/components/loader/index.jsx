import CircularProgress from '@mui/material/CircularProgress';


const Loader = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <CircularProgress />
    </div>
  )
}

export default Loader;