<template>
  <Logo />
  <RouterView />
  <ScoreBox />
  <LogoutButton />
  <ResultModal />
  <TheFooter />
</template>

<script>
import "./css/bttn.min.css";
import "./sass/main.scss";
import Logo from "./components/Logo";
import ScoreBox from "./components/ScoreBox";
import LogoutButton from "./components/LogoutButton";
import ResultModal from "./components/ResultModal";
import TheFooter from "./components/TheFooter";

export default {
  components: { Logo, ScoreBox, LogoutButton, ResultModal, TheFooter },
  created() {
    this.$store.dispatch("tryAutoLogin");
  },
};
</script>
