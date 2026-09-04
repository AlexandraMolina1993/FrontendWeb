import {
  footerAdminBrandStyle,
  footerAdminContainerStyle,
  footerAdminSectionStyle,
  footerAdminStyle,
  footerAdminTextStyle,
} from "../../shared/styles/layouts/footer.styles";

interface FooterAdminProps {
  nombreInstituto?: string;
}

export default function FooterAdmin({
  nombreInstituto = "Instituto Superior Villa del Rosario",
}: FooterAdminProps) {
  const anioActual = new Date().getFullYear();

  return (
    <footer className={footerAdminStyle}>
      <div className={footerAdminContainerStyle}>
        <p className={footerAdminTextStyle}>
          © {anioActual}{" "}
          <span className={footerAdminBrandStyle}>{nombreInstituto}</span>.
          Todos los derechos reservados.
        </p>

        <p className={footerAdminSectionStyle}>Panel administrativo</p>
      </div>
    </footer>
  );
}
