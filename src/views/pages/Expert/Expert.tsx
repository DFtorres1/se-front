import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useEvaluateExpert, {
  EvaluateFormInputs,
} from "./hooks/useEvaluateExpert";

// Opciones para cada selector
const faceTypeOptions = [
  { label: "Ovalado", value: "ovalado" },
  { label: "Redondo", value: "redondo" },
  { label: "Alargado", value: "alargado" },
  { label: "Cuadrado", value: "cuadrado" },
  { label: "Corazón", value: "corazon" },
  { label: "Diamante", value: "diamante" },
  { label: "Triangular", value: "triangular" },
  { label: "Rectangular", value: "rectangular" },
];

const skinToneOptions = [
  { label: "Frío", value: "frio" },
  { label: "Cálido", value: "calido" },
  { label: "Neutro", value: "neutro" },
  { label: "Mixto", value: "mixto" },
];

const hairLengthOptions = [
  { label: "Corto", value: "corto" },
  { label: "Medio", value: "medio" },
  { label: "Largo", value: "largo" },
];

// Esquema de validación usando yup
const schema = yup.object().shape({
  faceType: yup.string().required("El tipo de rostro es requerido"),
  skinTone: yup.string().required("El tono de piel es requerido"),
  hairLength: yup.string().required("El largo de cabello es requerido"),
});

const EvaluateExpert = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EvaluateFormInputs>({
    defaultValues: {
      faceType: "",
      skinTone: "",
      hairLength: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { mutate: evaluateExpert, isPending } = useEvaluateExpert();

  const onSubmit = (values: EvaluateFormInputs) => {
    evaluateExpert(values, {
      onSuccess: (data) => {
        // Aquí puedes mostrar la recomendación, por ejemplo en un alert o en la UI
        alert(`Recomendación: ${data.recommendation}`);
      },
      onError: (error) => {
        console.error("Error evaluando:", error);
        alert("Ocurrió un error al evaluar. Inténtalo nuevamente.");
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ maxWidth: "600px", width: "90%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={2}>
              {/* Selector para Tipo de Rostro */}
              <Grid>
                <FormControl fullWidth error={!!errors.faceType}>
                  <InputLabel id="faceType-label">Tipo de rostro</InputLabel>
                  <Controller
                    name="faceType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="faceType-label"
                        label="Tipo de rostro"
                        {...field}
                      >
                        {faceTypeOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.faceType && (
                    <p style={{ color: "red", margin: "0.5rem 0 0 0" }}>
                      {errors.faceType.message}
                    </p>
                  )}
                </FormControl>
              </Grid>

              {/* Selector para Tono de Piel */}
              <Grid>
                <FormControl fullWidth error={!!errors.skinTone}>
                  <InputLabel id="skinTone-label">Tono de piel</InputLabel>
                  <Controller
                    name="skinTone"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="skinTone-label"
                        label="Tono de piel"
                        {...field}
                      >
                        {skinToneOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.skinTone && (
                    <p style={{ color: "red", margin: "0.5rem 0 0 0" }}>
                      {errors.skinTone.message}
                    </p>
                  )}
                </FormControl>
              </Grid>

              {/* Selector para Largo de Cabello */}
              <Grid>
                <FormControl fullWidth error={!!errors.hairLength}>
                  <InputLabel id="hairLength-label">Largo de cabello</InputLabel>
                  <Controller
                    name="hairLength"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="hairLength-label"
                        label="Largo de cabello"
                        {...field}
                      >
                        {hairLengthOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.hairLength && (
                    <p style={{ color: "red", margin: "0.5rem 0 0 0" }}>
                      {errors.hairLength.message}
                    </p>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button variant="contained" type="submit" disabled={isPending}>
              Evaluar
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};

export default EvaluateExpert;