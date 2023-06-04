import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';


const BtnChange = styled(Button)<ButtonProps>(() => ({
  color: '#D92B04',
  '&:hover': {
    color: '#618C03',
    backgroundColor: 'none',
  }
}))

export default BtnChange;