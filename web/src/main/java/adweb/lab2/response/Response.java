package adweb.lab2.response;

abstract class Response {
    private int code;

    public Response(){
        code = 200;
    }

    protected void setCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
