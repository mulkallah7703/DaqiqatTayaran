import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Close from '@mui/icons-material/Close';
import emailjs from '@emailjs/browser';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-()\s]{7,}$/;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_contact';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_here';

const ContactPanel = ({ open, onClose, container }) => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const formRef = useRef(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [sendError, setSendError] = React.useState('');
  const [values, setValues] = React.useState({
    fullName: '',
    email: '',
    countryCode: '+966',
    contactNo: '',
    referral: '',
    companyName: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (open) {
      setSubmitted(false);
      setErrors({});
      setSendError('');
    }
  }, [open]);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.fullName.trim()) nextErrors.fullName = t('contactPanel.errors.required');
    if (!values.email.trim()) {
      nextErrors.email = t('contactPanel.errors.required');
    } else if (!EMAIL_REGEX.test(values.email)) {
      nextErrors.email = t('contactPanel.errors.email');
    }
    if (!values.contactNo.trim()) {
      nextErrors.contactNo = t('contactPanel.errors.required');
    } else if (!PHONE_REGEX.test(values.contactNo)) {
      nextErrors.contactNo = t('contactPanel.errors.phone');
    }
    if (!values.companyName.trim()) nextErrors.companyName = t('contactPanel.errors.required');
    if (!values.subject.trim()) nextErrors.subject = t('contactPanel.errors.required');
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setIsSending(true);
      setSendError('');
      try {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current,
          EMAILJS_PUBLIC_KEY
        );
        setSubmitted(true);
        formRef.current?.reset();
        setValues({
          fullName: '',
          email: '',
          countryCode: '+966',
          contactNo: '',
          referral: '',
          companyName: '',
          subject: '',
          message: '',
        });
      } catch (error) {
        setSendError(t('contactPanel.errors.sendFailed'));
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      disablePortal
      container={container}
      BackdropProps={{
        sx: {
          position: 'absolute',
          inset: 0,
        },
      }}
      fullScreen={fullScreen}
      sx={{
        '& .MuiDialog-container': {
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          position: 'absolute',
          inset: 0,
        },
      }}
      PaperProps={{
        sx: {
          m: 0,
          height: '100%',
          width: { xs: '100%', sm: 460 },
          maxWidth: { xs: '100%', sm: '90vw' },
          position: 'absolute',
          top: 0,
          right: 0,
          left: 'auto',
          zIndex: 1301,
          borderRadius: 0,
          background: 'rgba(11, 11, 11, 0.98)',
          borderLeft: '1px solid rgba(230, 126, 34, 0.2)',
          overflow: 'hidden',
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 3, md: 4 }, direction: isRTL ? 'rtl' : 'ltr', overflowY: 'auto', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">{t('contactPanel.title')}</Typography>
          <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
            <Close />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t('contactPanel.subtitle')}
        </Typography>
        <Link
          href="#"
          underline="none"
          sx={{
            color: 'primary.main',
            display: 'inline-flex',
            alignItems: 'center',
            mb: 3,
          }}
        >
          {t('contactPanel.locate')}
        </Link>

        {submitted ? (
          <Box sx={{ mt: 3, color: 'text.primary' }}>
            <Typography variant="body1">{t('contactPanel.success')}</Typography>
          </Box>
        ) : (
          <Box component="form" ref={formRef} onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            <Box
              component="input"
              type="hidden"
              name="phone"
              value={`${values.countryCode}${values.contactNo}`}
            />
            <TextField
              name="full_name"
              placeholder={t('contactPanel.fields.fullName.placeholder')}
              value={values.fullName}
              onChange={handleChange('fullName')}
              fullWidth
              error={Boolean(errors.fullName)}
              helperText={errors.fullName}
              InputLabelProps={{ shrink: false }}
              inputProps={{ dir: isRTL ? 'rtl' : 'ltr' }}
            />
            <TextField
              name="email"
              placeholder={t('contactPanel.fields.email.placeholder')}
              value={values.email}
              onChange={handleChange('email')}
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email}
              InputLabelProps={{ shrink: false }}
              inputProps={{ dir: 'ltr' }}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '120px 1fr' }, gap: 2 }}>
              <TextField
                select
                name="country_code"
                placeholder={t('contactPanel.fields.countryCode.placeholder')}
                value={values.countryCode}
                onChange={handleChange('countryCode')}
                fullWidth
                InputLabelProps={{ shrink: false }}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (value) =>
                    value || t('contactPanel.fields.countryCode.placeholder'),
                }}
              >
                <MenuItem value="+966">+966</MenuItem>
                <MenuItem value="+971">+971</MenuItem>
                <MenuItem value="+965">+965</MenuItem>
                <MenuItem value="+973">+973</MenuItem>
                <MenuItem value="+20">+20</MenuItem>
              </TextField>
              <TextField
                name="contact_no"
                placeholder={t('contactPanel.fields.phone.placeholder')}
                value={values.contactNo}
                onChange={handleChange('contactNo')}
                fullWidth
                error={Boolean(errors.contactNo)}
                helperText={errors.contactNo}
                InputLabelProps={{ shrink: false }}
                inputProps={{ dir: 'ltr' }}
              />
            </Box>
            <TextField
              select
              name="referral"
              placeholder={t('contactPanel.fields.referral.placeholder')}
              value={values.referral}
              onChange={handleChange('referral')}
              fullWidth
              InputLabelProps={{ shrink: false }}
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) =>
                  value ? t(`contactPanel.fields.referral.options.${value}`) : t('contactPanel.fields.referral.placeholder'),
              }}
            >
              <MenuItem value="google">{t('contactPanel.fields.referral.options.google')}</MenuItem>
              <MenuItem value="linkedin">{t('contactPanel.fields.referral.options.linkedin')}</MenuItem>
              <MenuItem value="instagram">{t('contactPanel.fields.referral.options.instagram')}</MenuItem>
              <MenuItem value="recommendation">{t('contactPanel.fields.referral.options.recommendation')}</MenuItem>
              <MenuItem value="other">{t('contactPanel.fields.referral.options.other')}</MenuItem>
            </TextField>
            <TextField
              name="company"
              placeholder={t('contactPanel.fields.company.placeholder')}
              value={values.companyName}
              onChange={handleChange('companyName')}
              fullWidth
              error={Boolean(errors.companyName)}
              helperText={errors.companyName}
              InputLabelProps={{ shrink: false }}
              inputProps={{ dir: isRTL ? 'rtl' : 'ltr' }}
            />
            <TextField
              name="subject"
              placeholder={t('contactPanel.fields.subject.placeholder')}
              value={values.subject}
              onChange={handleChange('subject')}
              fullWidth
              error={Boolean(errors.subject)}
              helperText={errors.subject}
              InputLabelProps={{ shrink: false }}
              inputProps={{ dir: isRTL ? 'rtl' : 'ltr' }}
            />
            <TextField
              name="message"
              placeholder={t('contactPanel.fields.message.placeholder')}
              value={values.message}
              onChange={handleChange('message')}
              fullWidth
              multiline
              rows={4}
              InputLabelProps={{ shrink: false }}
              inputProps={{ dir: isRTL ? 'rtl' : 'ltr' }}
            />
            {sendError && (
              <Typography variant="body2" color="error">
                {sendError}
              </Typography>
            )}
            <Button variant="contained" size="large" type="submit" disabled={isSending}>
              {isSending ? t('contactPanel.sending') : t('contactPanel.submit')}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ContactPanel);
