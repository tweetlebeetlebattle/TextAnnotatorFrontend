import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import SearchResult from "../components/SearchResult";
import { Link } from "react-router-dom";
import apiTerminal from "../server/apiTerminal";

let getStringValue = (
  obj: string | string[] | null | undefined,
  defaultValue?: string
): string => {
  if (obj == null) {
    if (defaultValue === undefined) {
      return "";
    }
    return defaultValue;
  }
  if (Array.isArray(obj)) {
    return obj[0];
  }
  return obj;
};

const SearchPage: React.FC<{}> = () => {
  const getSearchType = (location: any): string => {
    const params = queryString.parse(location.search);
    return getStringValue(params.t, "person");
  };

  const getSearchQuery = (location: any): string => {
    const params = queryString.parse(location.search);
    return getStringValue(params.q);
  };

  const location = useLocation();
  const history = useHistory();
  const definedSearchQuery = getSearchQuery(location);
  const definedSearchType = getSearchType(location);

  const [searchQuery, setSearchQuery] = useState(definedSearchQuery);
  const [searchType, setSearchType] = useState(definedSearchType);
  const [searchResultInstance, setSearchResultInstance] = useState(undefined);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const fetchResult = async (q: string, t: string) => {
    try {
      if (!q || q.length > 100) return;
      const res = await apiTerminal.search(t, q);
      setSearchResultInstance(res.length > 0 ? res[0] : undefined);
    } catch (err) {
      console.error("Search failed:", err);
      setErrorMessage("Search failed. Please try again later.");
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    const newQuery = getStringValue(queryString.parse(location.search).q);
    const newType = getStringValue(
      queryString.parse(location.search).t,
      "person"
    );
    setSearchQuery(newQuery);
    setSearchType(newType);
    if (newQuery) fetchResult(newQuery, newType);
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (searchQuery.length > 100) return alert("Search query too long.");
    const params = queryString.stringify({
      q: searchQuery.trim(),
      t: searchType,
    });
    history.push(`/search?${params}`);
  };

  return (
    <Container fluid style={{ padding: "3rem" }}>
      <h4>Knowledge Base Search</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8} sm={6}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col md={2} sm={4}>
            <FormControl
              as="select"
              className="mr-sm-2"
              name="t"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="person">Person</option>
              <option value="organisation">Organisation</option>
              <option value="role">Role</option>
            </FormControl>
          </Col>
          <Col md={2} sm={2}>
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
      <Form.Text className="text-muted">
        Try <Link to="/search?q=Alan%20Turing&t=person">Alan Turing</Link> or{" "}
        <Link to="/search?q=Google&t=organisation">Google</Link>
      </Form.Text>
      {definedSearchType &&
        definedSearchQuery &&
        (searchResultInstance ? (
          <Row md={3} className="py-4">
            <Col>
              <SearchResult instance={searchResultInstance} />
            </Col>
          </Row>
        ) : (
          <Alert variant="light">
            No {definedSearchType} matches found for "{definedSearchQuery}"
          </Alert>
        ))}
      <Modal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default SearchPage;
