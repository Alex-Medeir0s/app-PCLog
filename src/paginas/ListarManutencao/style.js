// style.js (ListarManutencao Mobile)
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  filtroContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  filtroTexto: {
    fontSize: 15,
    color: "#777",
    fontWeight: "600",
  },
  filtroAtivo: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  filtroConcluido: {
    color: "green",
    textDecorationLine: "underline",
  },
  filtroPendente: {
    color: "red",
    textDecorationLine: "underline",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  cardDate: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 50,
  },
  bottomButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  bottomButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
