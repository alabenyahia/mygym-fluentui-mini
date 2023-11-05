import {
  Card,
  Checkbox,
  Title3,
  Image,
  Button,
  Spinner,
} from "@fluentui/react-components";
import useLogin from "src/app/pages/auth/hooks/useLogin";
import { useNavigate } from "react-router-dom";

function calculatePercentage(arr: any) {
  function calculateDone(array: any[]) {
    let done = 0;
    array?.forEach((item: any) => {
      if (item.isDone) {
        done++;
      }
    });
    return done;
  }
  if (!arr) return 0;
  return (calculateDone(arr) / arr.length) * 100;
}

export default function GetStarted() {
  const { getUserQuery } = useLogin();
  const navigate = useNavigate();

  console.log("user data getstarted", getUserQuery.data?.getStarted);
  return (
    <Card>
      {getUserQuery.isPending ? (
        <Spinner label="Loading tasks..." />
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Image
                width={48}
                height={48}
                src="/icons/icon-rocket.png"
              ></Image>
              <Title3>Get Started with MyGym</Title3>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                outline: "1px solid black",
                padding: "8px",
                backgroundColor: "white",
                borderRadius: "4px",
              }}
            >
              <p>You are done in</p>
              <span style={{ fontWeight: "bold" }}>
                {calculatePercentage(getUserQuery.data?.getStarted)}%
              </span>
            </div>
          </div>

          <div>
            {getUserQuery.data?.getStarted.map((item: any) => {
              return (
                <div>
                  <Checkbox checked={item.isDone} label={item.desc} />
                  {!item.isDone ? (
                    <Button size="small" onClick={() => navigate(item.url)}>
                      {item.buttonText}
                    </Button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </>
      )}
    </Card>
  );
}
