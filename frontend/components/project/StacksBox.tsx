import styled from 'styled-components';
import Stack from '../stack/Stack';
import Btn from '../button/Btn';

type Props = {
  stacks: string[];
  onModal?: () => void;
};

const StacksBox = ({ stacks, onModal }: Props) => {
  return (
    <Box>
      <div>프로젝트 메인 스택</div>
      <ul className="noto-regular-13">
        <li className="button-box">
          {stacks.length === 0 && onModal ? (
            <Btn onClick={onModal}>
              <span>스택 등록</span>
            </Btn>
          ) : (
            <ul onClick={onModal} className="select-tag-box">
              {stacks.map((skill) => (
                <Stack key={skill} skill={skill} />
              ))}
            </ul>
          )}
        </li>
      </ul>
    </Box>
  );
};

export default StacksBox;

type BoxProps = {
  onModal?: () => void;
};

const Box = styled.div<BoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .main-btn {
    padding: 4px;
  }

  .select-tag-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    > li {
      box-shadow: var(--box-shadow);
    }
  }
`;
