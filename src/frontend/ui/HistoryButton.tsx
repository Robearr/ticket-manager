import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HistoryButtonProps {
  icon: IconDefinition
  direction: string
}

export const HistoryButton: React.FC<HistoryButtonProps> = ({ icon, direction }) => {

  const handleClick = () => {
    // @ts-ignore
    window.electron.notificationApi.handleHistoryEvent(direction);
  };

  return (
    <FontAwesomeIcon icon={icon} onClick={handleClick} style={{ paddingLeft: '1%', cursor: 'pointer' }} title={direction}/>
  );
};