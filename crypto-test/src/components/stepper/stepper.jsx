import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
    // fontSize: "50px"
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "green",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "green",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  // label: {
  //   fontSize: "50px"
  // },
  display: "flex",
  height: 22,
  alignItems: "center",
  // fontSize: "20px",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "white",
    zIndex: 1,
    fontSize: 14,
  },
  "& .color-circle": {
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "#eaeaf0",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
  },
  "& .color-circle-complete": {
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
  },
  "& .color-circle-active": {
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    color: "white"
  }
}));

function QontoStepIcon(props) {
  const { active, completed, className, icon } = props;
  console.log("rest", icon);
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {active ? (
        <div className="color-circle-active">
          {/* <Check className="QontoStepIcon-completedIcon" /> */}
          {icon}
          
        </div>
      ) : 
      completed ? (
        <div className="color-circle-complete">
          <Check className="QontoStepIcon-completedIcon" />
        </div>
      ) : (
        <div className="color-circle">{icon}</div>
      )}
    </QontoStepIconRoot>
    
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

export default function CustomizedSteppers({ steps, activeStep }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}